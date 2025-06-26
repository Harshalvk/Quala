import React, { Suspense } from "react";
import SigninPageContent from "./_components/SigninpageContent";

const SignInPage = () => {
  return (
    <Suspense fallback={null}>
      <SigninPageContent />
    </Suspense>
  );
};

export default SignInPage;
