import React from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  //   const [showForm, setShowForm] = useState(false);
  //   return (
  //     <div>
  //       <Button onClick={() => setShowForm((show) => !show)}>
  //         add new Cabin
  //       </Button>
  //       {showForm && (
  //         <Modal onClose={() => setShowForm(false)}>
  //           <CreateCabinForm onCloseForm={() => setShowForm(false)} />
  //         </Modal>
  //       )}
  //     </div>
  //   );
}
