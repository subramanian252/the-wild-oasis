import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import useCheckIn from "./useCheckIn";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();

  const [confirmPaid, setIsConfirmPaid] = useState(false);

  const [breakfast, setBreakFast] = useState(false);

  const { checkIn } = useCheckIn();

  const { isLoading: isSettingsLoading, settings } = useSettings();

  useEffect(() => {
    setIsConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (breakfast)
      checkIn({
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    else checkIn({ breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={() => {
              setBreakFast((confirm) => !confirm);
              setIsConfirmPaid(false);
            }}
            id="breakfast"
          >
            I need breakfast at the price of {formatCurrency(breakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setIsConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {breakfast
            ? formatCurrency(breakfastPrice + totalPrice) +
              `(${breakfastPrice} + ${totalPrice})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
