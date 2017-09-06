
/**
 * Created by Administrator on 2017/9/1.
 */
import React ,{Component} from 'react'

import {Row, Col,Modal,Icon, Tabs, Card,Upload,} from 'antd'

import axios from 'axios'

const TabPane = Tabs.TabPane

class UserCenter extends Component{
    constructor(props){
        super(props)
        this.state = {
            //收集列表数据
            userCollectionsList : [],
            //评论列表数据
            userCommentsList:[],
        }
    }
//获取用户收集列表数据
componentDidMount(){
    const userId =localStorage.getItem('userId')
    let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+userId
    axios.get(url)
        .then(response=>{
            const userCollections=response.data
            this.setState({userCollections})
        })

//获取用户评论列表数据
    url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+userId
    axios.get(url)
        .then(response=>{
            const userComments = response.data
            this.setState({userComments})
        })

}



    render(){
    const {userCollections,userComments} = this.state

    const userCollectionsList = userCollections.length
         ? userCollections.map((uc, index) => (
             <Card key={index} title={uc.uniquekey}
                   extra={<a href={`/#/news_detail/${uc.uniquekey}`}>查看</a>}>
                <p>{uc.Title}</p>
             </Card>
            ))
         : '您还没有收藏任何的新闻，快去收藏一些新闻吧。'

    const userCommentsList = userComments.length
         ? userComments.map((comment, index)=>(
            <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                    extra={<a href={`/#/news_detail/${comment.uniquekey}`}>查看</a>}>
                 <p>{comment.Comments}</p>
            </Card>
            ))
            : '您还没有发表过任何评论。'





        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">{userCollectionsList}</TabPane>
                            <TabPane tab="我的评论列表" key="2">{userCommentsList}</TabPane>
                            <TabPane tab="头像设置" key="3"></TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default UserCenter