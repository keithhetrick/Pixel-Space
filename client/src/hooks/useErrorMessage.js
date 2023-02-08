const useErrorMessage = ({ variant, message }) => {
  console.log("variant:", variant);
  console.log("message:", message);

  const formattedMessage = message.split(/,|-/).map((msg, i) => (
    <span key={i}>
      {msg}
      <br />
    </span>
  ));

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 mb-5 error__message"
      variant={variant}
    >
      <span className="block sm:inline">
        <span>{formattedMessage}</span>
      </span>
    </div>
  );
};

export default useErrorMessage;
