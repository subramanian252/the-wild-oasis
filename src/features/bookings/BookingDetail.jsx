import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  const { isCheckOut, checkOut } = useCheckOut();

  const { isDeleteing, deleteBookingMutate } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty>No Booking could be found</Empty>;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>
            Check in booking #{id}
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              variation="danger"
              disabled={isDeleteing}
              icon={<HiTrash />}
            >
              Delete Booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBookingMutate(id, {
                  onSettled: () => {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button
            disabled={isCheckOut}
            onClick={() => {
              checkOut(id);
              navigate("bookings", { replace: true });
            }}
            icon={<HiArrowUpOnSquare />}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
