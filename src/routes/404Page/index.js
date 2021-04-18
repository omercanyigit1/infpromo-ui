import {React} from 'react';
import { Result, Button } from 'antd';

const ErrorPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Aradığınız sayfa bulunamadı."
      extra={<Button className={"btn btn-primary"}>Search Ekranı</Button>}
    />
  )
}

export default ErrorPage;
