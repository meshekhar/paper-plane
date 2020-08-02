import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import { selectIsCollectionsLoaded} from "../../redux/shop/shop.selector";
import CollectionPage from "../collection/collectionpage.component";
import WithSpinner from "../../components/with-spinner/with-spinner.styles";


const mapSelectToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

//const CollectionsPageContainer = connect(mapSelectToProps)(WithSpinner(CollectionPage));

//Same as above using compose instead of connect
const CollectionsPageContainer = compose(connect(mapSelectToProps), WithSpinner,)(CollectionPage)

export default CollectionsPageContainer;