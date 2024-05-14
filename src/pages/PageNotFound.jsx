import {Link} from "react-router-dom";
const PageNotFound = function() {
    return (<>
        <h1>Page Not Found</h1>
        <Link to="/">Main Page</Link>
    </>);
};

export default PageNotFound;
