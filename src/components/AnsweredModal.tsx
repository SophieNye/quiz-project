import "./AnswerModal.css";

interface AnsweredModalProps {
  answered: string | boolean;
  correctAnswer: string;
}

function AnsweredModal({ answered, correctAnswer }: AnsweredModalProps) {
  return (
    <div id="modal-container">
      <img
        src={
          answered === "Correct"
            ? "src/assets/vecteezy_check-mark-vector-icon-checkmark-right-symbol-tick-sign-ok_8134818.jpg"
            : "src/assets/vecteezy_flat-red-cross-check-mark-for-indicate-wrong-choice_22191595.jpg"
        }
      />
      <div>{answered}</div>
      {answered === "Incorrect" && (
        <div>{`Correct answer: ${correctAnswer}`}</div>
      )}
    </div>
  );
}

export default AnsweredModal;
