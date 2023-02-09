import { useEffect } from "react";

const ErrorLandingPage = () => {
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Back";
    button.href = "/";
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[calc(80vh-73px)]">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
      </div>
    </div>
  );
};

export default ErrorLandingPage;
