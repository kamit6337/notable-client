import { useEffect, useRef, useState } from "react";

const FindingDivScrollHeight = (list, list2 = null) => {
  const ref = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const divHeight = ref.current.scrollHeight;

      setContentHeight(divHeight);
    }
  }, [list, list2]);

  return { ref, height: contentHeight };
};

export default FindingDivScrollHeight;
