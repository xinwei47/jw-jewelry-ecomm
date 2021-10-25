import FilterForm from './FilterForm';
import SubNavi from './SubNavi';

import '../styles/components/_sidebar.scss';

const Sidebar = (props) => {
  return (
    <>
      <div className={props.className}>
        <SubNavi menuList={props.menuList} />

        <FilterForm onFiltersSubmittedData={props.onFiltersSubmittedData} />
      </div>
    </>
  );
};

export default Sidebar;
