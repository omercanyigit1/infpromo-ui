import React from "react";
import {Button} from "antd";
import {isLoggedIn, postSelectedPrice} from '../../../appRedux/actions/';
import {connect} from 'react-redux';

const PricingList = (props) => {
  const {title, desc, features, children, postSelectedPrice} = props;

  function handleClick() {
    let data = {
      title: title,
      desc: desc,
      list: false
    }
    postSelectedPrice(data);
  }

  return (
    <React.Fragment>
      <div className="box-item mb-4">
      {children ? (
        children
      ) : (
        <h4 className="title mb-2">{title} Kredi</h4>
      )}
      <h5 className="title mb-2"> {desc} ₺</h5>
      <ul className="list-unstyled feature-list text-muted">
        {features.map((feature, key) => (
          <li key={key} className="mb-0">
              <span className="text-primary h5 mr-2">
                <i className="uil uil-check-circle align-middle"/>
              </span>
            {feature.title}
          </li>
        ))}
      </ul>
        <Button className={"btn btn-primary mb-2"} onClick={handleClick}>Hemen Seç</Button>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedCredit: state.list.selectedCredit,
    selectedCurrency: state.list.selectedCurrency
  }
}

export default connect(mapStateToProps, {isLoggedIn, postSelectedPrice})(PricingList);
