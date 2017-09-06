//评论组件
import React, {PropTypes} from 'react'

import {Form, Input, Button, Card, notification} from 'antd'

import axios from 'axios'


const FormItem = Form.Item

class NewsComments extends  React.Component{
    static propTypes ={
    uniqueKey:PropTypes.string.isRequired
}
    constructor(props){
    super(props)
        this.sate = {
        comments : []
    }
}
    componentDidMount(){
    const  {uniqueKey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=512&uniquekey=${uniqueKey}`
        axios.get(url)
            .then (response=>{
            const comments = response.data
             this.setState({comments})
    })
}


//提交获取用户名  查看是否有用户名
    handleSubmit(event){
    event.preventDefault()
        const usedId = localStorage.getItem('userId')
        if(!usedId){
        alert('请登录')
    }
        const {comment} = this.props.getFieldsValue()
        const {uniquekey} = this.props
        const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=
        ${usedId}&uniquekey=${uniquekey}&commnet=${comment}`

        //发送请求
        axios.get(url)
            .then(response=>{
            this.componentDidMount()
            this.props.form.resetFields()
            notification.success({message:'提交成功了！'})

    })
}


//收藏文章,收藏文章前必须得先登录
    addUserCollection(){
    let userId = localStorage.getItem('userId')
    if (!userId){
        alert('请先登陆')
        return
    }

    const url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="
    + userId +"&uniquekey=" +this.props.uniquekey
    axios.get(url)
        .then(response=>{
            notification.success({message: 'ReactNews提醒', description: '收藏此文章成功'})
    })
}

    render() {
        const {getFieldDecorator} = this.props.form
        const {comments} = this.state
        const commentList = comments.length
            ? comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : '没有加载到任何评论'

        return (
            <div style={{padding: '10px'}}>
                {commentList}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="您的评论">
                        {
                            getFieldDecorator('comment')(<Input type="textarea" placeholder="随便写点什么"/>)
                        }
                    </FormItem>
                    <Button type='primary' htmlType="submit">提交评论</Button>
                    &nbsp;&nbsp;
                    <Button type='primary' htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                </Form>
            </div>
        )
    }
}
export  default Form.create({})(NewsComments)