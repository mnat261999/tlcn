import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Tabs, Button } from 'antd';
import { Row, Col} from 'antd';
import { Avatar } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import "aos/dist/aos.css"
import Aos from 'aos'
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/vi';
import { Tag } from 'antd';
moment.locale('vi');



const { TabPane } = Tabs;

function OrderHistory() {
  const state = useContext(GlobalState)
  const [history, setHistory] = state.userAPI.history
  const token = useSelector(state => state.token)
  const [callbackPayment, setCallbackPayment] = state.userAPI.callbackPayment

  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_2520839_vl6foh3kj58.js'
    ],
  });


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  useEffect(() => {
    Aos.init({duration: 2000});
  })

  const handleUpdate = async (id) => {
    console.log({id})
    const res = await axios.patch(`/api/update_payment/${id}`, {status:0},{
        headers: {Authorization: token}
    })
    console.log({res})
    showSuccessMsg('success',"Hủy thành công")
    setCallbackPayment(!callbackPayment)
  }

  const rederContentTab1 = (his) =>{
    let myHistory =[];
    his.map((h) => {
        myHistory.push(
          <Row gutter={[16, 16]}>
          <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} lx={{span: 24}}>
            <div className="card-history" key={h._id}>
              {
                h.cart.map(_ =>(
                  <div className="card-buy">
                    <Row gutter={[16, 16]} justify="space-around" align="middle">
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                        <Avatar shape="square" size={120} src={_.images.url}/>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Sản phẩm</h3>
                          <p>{_.content}</p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Gía</h3>
                          <p className="price text-3xl">{numberWithCommas(_.price)} <u>đ</u></p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                        <h3 className="text-3xl font-bold">Số lượng</h3>
                        <div>{_.quantity}</div>
                      </Col>
                    </Row>
                  </div>
                ))
              }

              <div className="card-infor">
                <div className="sum-total">
                  <h5 className="text-2xl font-bold">Tổng cộng</h5>
                  <p className="price text-4xl">{numberWithCommas(h.total)} <u>đ</u></p>
                  {
                    h.status === 1 &&
                    <div className="button-more-infor">
                      <Tag className="cursor-pointer ..." color="#f50" onClick={() => handleUpdate(h._id)}  size="small" danger icon={<IconFont type="iconcancel" style={{ fontSize: '18px'}}/>}>
                          Hủy đơn hàng
                      </Tag>
                      <Tag color="#2db7f5">
                        {h.statusName}
                      </Tag>
                  </div>
                  || 
                  <div className="button-more-infor">
                  <Tag color="#2db7f5">
                      {h.statusName}
                  </Tag>
                </div>
                  }
                  <div className="infor-detail mt-5">
                    
                  {
                    h.type === 1
                    &&
                    <>
                    <div className="group-address">
                      <p>Địa chỉ: <span>{h.address}</span></p>
                    </div>
                    <div className="group-phone">
                      <p>Số điện thoại: <span>{h.phone}</span></p>
                    </div>
                    </>
                    ||
                    <>
                    <div className="group-payment">
                      <p>PaymentID: <span>{h.paymentID}</span></p>
                    </div>

                    <div className="group-address">
                      <p>Địa chỉ: <span>{h.address.line1 + " - " + h.address.city}</span></p>
                    </div>
                    </>
                  }
{/*                     <div className="group-address">
                      <p>Địa chỉ: <span>{h.address}</span></p>
                    </div> */}



                    <div className="group-type">
                      <p>Hình thức thanh toán: <span>{h.typeName}</span></p>
                    </div>

                    <div className="group-day">
                      <p>Ngày đặt hàng: <span>{`${moment(h.createdAt).fromNow()}, ${moment(h.createdAt).format('LLLL')}`}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        );
  });
  return myHistory;
}

  const rederContentTab2 = (his) =>{
    let myHistory =[];
    his.map((h) => {
      if(h.status === 1)
      {
        myHistory.push(
          <Row gutter={[16, 16]}>
            <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} lx={{span: 24}}>
              <div className="card-history" key={h._id}>
                {
                  h.cart.map(_ =>(
                    <div className="card-buy">
                      <Row gutter={[16, 16]} justify="space-around" align="middle">
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                          <Avatar shape="square" size={120} src={_.images.url}/>
                        </Col>
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                            <h3 className="text-3xl font-bold">Sản phẩm</h3>
                            <p>{_.content}</p>
                        </Col>
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                            <h3 className="text-3xl font-bold">Gía</h3>
                            <p className="price text-3xl">{numberWithCommas(_.price)} <u>đ</u></p>
                        </Col>
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Số lượng</h3>
                          <div>{_.quantity}</div>
                        </Col>
                      </Row>
                    </div>
                  ))
                }

                <div className="card-infor">
                  <div className="sum-total">
                    <h5 className="text-2xl font-bold">Tổng cộng</h5>
                    <p className="price text-4xl">{numberWithCommas(h.total)} <u>đ</u></p>
                    <div className="button-more-infor">
                      <Tag className="cursor-pointer ..." color="#f50" onClick={() => handleUpdate(h._id)}  size="small" danger icon={<IconFont type="iconcancel" style={{ fontSize: '18px'}}/>}>
                          Hủy đơn hàng
                      </Tag>
                    </div>
                    <div className="infor-detail mt-5">
                      <div className="group-address">
                        <p>Địa chỉ: <span>{h.address}</span></p>
                      </div>

                      <div className="group-phone">
                        <p>Số điện thoại: <span>{h.phone}</span></p>
                      </div>

                      <div className="group-type">
                        <p>Hình thức thanh toán: <span>{h.typeName}</span></p>
                      </div>

                      <div className="group-day">
                        <p>Ngày đặt hàng: <span>{`${moment(h.createdAt).fromNow()}, ${moment(h.createdAt).format('LLLL')}`}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        );
      }

  });
  return myHistory;
}

const rederContentTab3 = (his) =>{
  let myHistory =[];
  his.map((h) => {
    if(h.status === 2)
    {
      myHistory.push(
        <Row gutter={[16, 16]}>
          <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} lx={{span: 24}}>
            <div className="card-history" key={h._id}>
              {
                h.cart.map(_ =>(
                  <div className="card-buy">
                    <Row gutter={[16, 16]} justify="space-around" align="middle">
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                        <Avatar shape="square" size={120} src={_.images.url}/>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Sản phẩm</h3>
                          <p>{_.content}</p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Gía</h3>
                          <p className="price text-3xl">{numberWithCommas(_.price)} <u>đ</u></p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                        <h3 className="text-3xl font-bold">Số lượng</h3>
                        <div>{_.quantity}</div>
                      </Col>
                    </Row>
                  </div>
                ))
              }

              <div className="card-infor">
                <div className="sum-total">
                  <h5 className="text-2xl font-bold">Tổng cộng</h5>
                  <p className="price text-4xl">{numberWithCommas(h.total)} <u>đ</u></p>
                  <div className="infor-detail mt-5">
                  <div className="group-payment">
                      <p>PaymentID: <span>{h.paymentID}</span></p>
                  </div>

                    <div className="group-address">
                      <p>Địa chỉ: <span>{h.address.line1 + " - " + h.address.city}</span></p>
                    </div>

                    <div className="group-type">
                      <p>Hình thức thanh toán: <span>{h.typeName}</span></p>
                    </div>

                    <div className="group-day">
                      <p>Ngày đặt hàng: <span>{`${moment(h.createdAt).fromNow()}, ${moment(h.createdAt).format('LLLL')}`}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    }

});
return myHistory;
}



const rederContentTab4 = (his) =>{
  let myHistory =[];
  his.map((h) => {
    if(h.status === 0)
    {
      myHistory.push(
        <Row gutter={[16, 16]}>
          <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} lx={{span: 24}}>
            <div className="card-history" key={h._id}>
              {
                h.cart.map(_ =>(
                  <div className="card-buy">
                    <Row gutter={[16, 16]} justify="space-around" align="middle">
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>
                        <Avatar shape="square" size={120} src={_.images.url}/>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Sản phẩm</h3>
                          <p>{_.content}</p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                          <h3 className="text-3xl font-bold">Gía</h3>
                          <p className="price text-3xl">{numberWithCommas(_.price)} <u>đ</u></p>
                      </Col>
                      <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                        <h3 className="text-3xl font-bold">Số lượng</h3>
                        <div>{_.quantity}</div>
                      </Col>
                    </Row>
                  </div>
                ))
              }

              <div className="card-infor">
                <div className="sum-total">
                  <h5 className="text-2xl font-bold">Tổng cộng</h5>
                  <p className="price text-4xl">{numberWithCommas(h.total)} <u>đ</u></p>
                  <div className="infor-detail mt-5">
                    <div className="group-address">
                      <p>Địa chỉ: <span>{h.address}</span></p>
                    </div>

                    <div className="group-phone">
                      <p>Số điện thoại: <span>{h.phone}</span></p>
                    </div>

                    <div className="group-type">
                      <p>Hình thức thanh toán: <span>{h.typeName}</span></p>
                    </div>

                    <div className="group-day">
                      <p>Ngày đặt hàng: <span>{`${moment(h.createdAt).fromNow()}, ${moment(h.createdAt).format('LLLL')}`}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    }

});
return myHistory;
}

const panes = [
  { title: 'Tất cả', content: rederContentTab1(history), key: '1' },
  { title: 'Chưa thanh toán', content: rederContentTab2(history), key: '2' },
  { title: 'Đã thanh toán', content:rederContentTab3(history) ,key: '3' },
  { title: 'Đã hủy', content:rederContentTab4(history), key: '4' }
];
  return (
  <div className="bg-gray-100">
    <div className="pt-20 pb-20">
      <div className="container-history-cart">
        <h2 className="text-4xl mb-10">Lịch sử mua hàng</h2>
        <Tabs>
          {panes.map(_ =>(
            <TabPane tab={_.title} key={_.key}>
            {_.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  </div>
  );
}

export default OrderHistory;