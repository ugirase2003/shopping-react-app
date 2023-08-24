import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// this is for keeping scroll to top
export default function GoToTop() {
const routePath = useLocation();
const onTop = () => {
	window.scrollTo(0, 0);
}
useEffect(() => {
	onTop()
}, [routePath]);

return null;
}
