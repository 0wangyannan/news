//文本新闻列表组件
import React,{Component} from 'react'

import {Link} from 'react-router'

import axios from 'axios'

import { Card } from 'antd'

export default class NewsBlock extends Component{
    //规定props的类型和限制的必要性
    static propTypes  = {
        type:React.PropTypes.string.isRequired,//类型

        count:React.PropTypes.number.isRequired,//数量
    }
    //组件类的构造函数 查看所有属性
    constructor(){
        super()
        this.state = {
            newsArr:[]
        }
    }
    //发送请求
    componentDidMount(){

        const {type,count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                const newsArr = response.data
                this.setState({newsArr})
            })
    }




    render(){
        //定义一个数组
        const {newsArr} = this.state
        const newsList = newsArr.length
        ?newsArr.map((news,index)=>(
                <li key={index}>
                    <Link to={`detail/${news.uniquekey}`}>
                        {news.title}
                    </Link>
                </li>
            ))
            :'没有新闻'

        return(
            <Card className="topNewsList">
                <ul>{newsList}</ul>
            </Card>
        )
    }
}

