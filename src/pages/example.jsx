import React, { useState, useEffect } from "react";

function ExampleComponent() {
  useEffect(() => {
    console.log("Effect: Component mounted");

    return () => {
      console.log("Cleanup: Component unmounted");
    };
  }, []); // Empty array: only runs once on mount and cleanup on unmount

  return <div>Check the console logs when the component mounts/unmounts.</div>;
}

export default ExampleComponent;
