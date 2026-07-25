function ErrorMessage({ message }) {
  return (
    <div
      className="empty-state error-state"
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;