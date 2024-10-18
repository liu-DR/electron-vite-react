import './index.less';
import React, { useEffect, useState } from 'react';
import { Modal, Button, message, Form, Cascader } from 'antd';
import { useNavigate } from 'react-router-dom';

const opt = [
  {
    label: 'Bamboo',
    value: 'bamboo',
    isLeaf: false,
  },
];

//注释
const HomeIndex = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { SHOW_CHILD } = Cascader;
  const [modal, contextHolder] = Modal.useModal();
  const [values, setValues] = useState({
    cascader: [
      ['bamboo', 'fish'],
      ['bamboo', 'cards'],
    ],
  });
  const [options, setOptions] = useState(opt);

  const countDown = (time: number) => {
    let secondsToGo = 5;
    let intervalTime = time;
    let timer;
    let instance;
    let timeOUt;

    timeOUt = setTimeout(() => {
      instance = modal.warning({
        title: '倒计时开始',
        content: `This modal will be destroyed after secondsToGo: ${secondsToGo} intervalTime: ${intervalTime} second.`,
        okText: '确认',
        onOk: () => {
          alert('关闭倒计时弹窗');
          instance.destroy();
        },
      });
    }, intervalTime * 1000);
    if (!timer) {
      timer = setInterval(() => {
        if (intervalTime > 0) {
          intervalTime -= 1;
        } else {
          clearTimeout(timeOUt);
          secondsToGo -= 1;
          instance.update({
            content: `This modal will be destroyed after secondsToGo: ${secondsToGo} intervalTime: ${intervalTime} second.`,
          });
          setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
          }, secondsToGo * 1000);

          if (!secondsToGo) {
            clearInterval(timer);
            message.success('关闭成功');
          }
        }
      }, 1000);
    }
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    setTimeout(() => {
      targetOption.children = [
        {
          label: 'Toy Fish',
          value: 'fish',
        },
        {
          label: 'Toy Cards',
          value: 'cards',
        },
        {
          label: 'Toy Bird',
          value: 'bird',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  useEffect(() => {
    if (!form) return;
    loadData(options);
  }, [form]);

  return (
    <div>
      {contextHolder}
      <div className={'content'}>
        <Button onClick={() => countDown(10)}>Open modal to close in 5s</Button>
      </div>
      <h1 style={{ textAlign: 'center' }}>星球旋转</h1>
      <div
        className={'planetRotation'}
        style={{ textAlign: 'center', marginTop: 15 }}
      >
        <div className={'planet'}>
          <div className={'satellite'}></div>
        </div>
      </div>
      <div>
        <h1>表单</h1>
        <Form form={form} initialValues={values}>
          <Form.Item label="级联表单项" name="cascader">
            <Cascader
              options={options}
              multiple
              maxTagCount="responsive"
              showCheckedStrategy={SHOW_CHILD}
              loadData={loadData}
            />
          </Form.Item>
        </Form>
      </div>
      <br />
      <Button type="primary" onClick={() => navigate('/login')}>
        前往登录页
      </Button>
    </div>
  );
};

export default HomeIndex;
