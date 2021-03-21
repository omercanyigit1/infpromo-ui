import React from 'react';
import {Card, Input} from 'antd';

const AccountPage = (props) => {
  return (
    <div>
      <div className="title-heading gx-mb-5">
        <h3 className="title mb-1">
          Hesabımı Düzenle
        </h3>
        <p className="text-muted">
          Hesabınızı kolayca güncelleyebilirsiniz.
        </p>
      </div>

      <Card title={"Hesabım"}>

        <div>
          <p><b>Email: </b> canygt27@gmail.com</p>
        </div>

      </Card>
    </div>
  )
}

export default AccountPage;
