import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cssModules from '../../utils/cssModules';
import UUID from 'uuidjs';
import Notice from './Notice';

const messageContent = {
    title: '',
    message: '',
}

const create = () => {
    if (Message.component && Message.element) return Message.component;
    let box = document.createElement('div');
    box.className = 'message-box';
    document.body.appendChild(box);
    Message.element = box;
    Message.component = ReactDOM.render(<Message />, box);
    return Message.component;
}

const destroy = () => {
    if (Message.component && Message.element) {
        ReactDOM.unmountComponentAtNode(Message.element);
        document.body.removeChild(Message.element);
        Message.component = null;
        Message.element = null;
    }
}

class Message extends Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [], // 存储当前有的messages数据
            messageList: [],   // message元素集合
            // hasMask: true, // 是否显示蒙版
        }
    }
    info = (content, duration, onClose) => {
        // 添加notice
        // 创造一个不重复的key
        let message = {content, duration, onClose}
        const { messages } = this.state;
        const key = message.key = UUID.generate();
        // const mask = message.mask ? message.mask : false;
        const isExist = messages.filter(item => item.key === key).length;

        if(!isExist){
            // 不存在重复的 添加
            messages.push(message);
            Message.number++;
            this.setState(prevState => ({messages: messages}));
        }
    }
    remove = key => {
        // 根据key删除对应
        this.setState(prevState => ({messages: prevState.messages.filter(message => message.key !== key)}));
        Message.number = this.state.messages.length;
        if (!Message.number) {
            destroy();
        }
    }
    getChildren = () => {
        const _this = this;
        const { messages } = this.state;

        return messages.map(message => {
            // 每个Notice onClose的时候 删除掉feedbacks中对应key的notice
            const onClose = () => {
                // 如果有用户传入的onClose 执行
                if(typeof message.onClose == 'function') message.onClose();
                _this.remove(message.key);
            };
            return (<Notice {...message} onClose={onClose} />)
        });

    }
    // getMask () {
    //     const {notices, hasMask} = this.state;
    //     // feedbacks为空的时候 不显示蒙版
    //     // 始终只有一个蒙版
    //     if(notices.length && hasMask) return (<div className="mask"></div>);
    // }
    // 销毁元素

    render () {
        const messageList = this.getChildren();
        return (
            <div>
                {messageList}
            </div>
        )
    }
}

// 类的静态属性，子组件数量
// ES6不支持类内定义静态属性，只能通过下面方式定义类静态属性
Message.number = 0;

// message组件静态方法
// 信息组件
Message.info = (content = messageContent, duration = 3000, onClose) => {
    const messageComponent = create();
    messageComponent.info(content, duration, onClose);
};


export default Message;
