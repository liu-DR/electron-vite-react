import React from 'react'
import { Modal, Button, message } from 'antd'
import './index.less'


const HomeIndex = () => {
    const [modal, contextHolder] = Modal.useModal();

    const countDown = (time: number) => {
        let secondsToGo = 5;
        let intervalTime = time
        let timer
        let instance
        let timeOUt

        timeOUt = setTimeout(() => {
            instance = modal.warning({
                title: '倒计时开始',
                content: `This modal will be destroyed after secondsToGo: ${secondsToGo} intervalTime: ${intervalTime} second.`,
                okText: '确认',
                onOk: () => {
                    alert('关闭倒计时弹窗')
                    instance.destroy()
                }
            });
        }, intervalTime * 1000);
        if(!timer) {
            timer = setInterval(() => {
                if(intervalTime > 0) {
                    intervalTime -= 1
                } else {
                    clearTimeout(timeOUt)
                    secondsToGo -= 1;
                    instance.update({
                        content: `This modal will be destroyed after secondsToGo: ${secondsToGo} intervalTime: ${intervalTime} second.`,
                    })
                    setTimeout(() => {
                        clearInterval(timer);
                        instance.destroy()
                    }, secondsToGo * 1000);

                    if(!secondsToGo) {
                        clearInterval(timer);
                        message.success('关闭成功')
                    }
                }
            }, 1000);
        }
    }
    
    return (
        <div>
            {contextHolder}
            <div className={"content"}>
                <Button onClick={() => countDown(10)}>Open modal to close in 5s</Button>
            </div>
            <h1 style={{ textAlign: 'center' }}>星球旋转</h1>
            <div className={"planetRotation"} style={{ textAlign: 'center', marginTop: 15 }}>
                <div className={"planet"}>
                    <div className={"satellite"}></div>
                </div>
            </div>
        </div>
    )
}

export default HomeIndex