
import {connect} from "react-redux";
import {selectIsCollectionFetching} from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.styles";
import CollectionsOverview from "./collections-overview.component";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";


const mapSelectToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionFetching
});

//const CollectionsOverviewContainer = connect(mapSelectToProps)(WithSpinner(CollectionsOverview));

//Same as above using compose instead of connect

const CollectionsOverviewContainer = compose(connect(mapSelectToProps), WithSpinner,)(CollectionsOverview)

export default CollectionsOverviewContainer;