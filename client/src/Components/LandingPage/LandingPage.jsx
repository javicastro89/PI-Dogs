import React, { useEffect } from "react";

function LandingPage({ handler }) {

    useEffect(() => {
        handler(false)
        return () => handler(true)
    }, [handler])

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
}

export default LandingPage;
