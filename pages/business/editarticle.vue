<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
    <!--  修改活动页面 -->
    <div class="my-edit-article">

        <topback />

        <van-cell title="修改活动" style="margin-bottom:10px;" />
        <van-cell-group>
            <van-field required clearable v-model="title" placeholder="请输入标题，32个字以内"  />
        </van-cell-group>
        <div class="quill-editor"
             v-model="content"
             v-quill:myQuillEditor="editorOption">
        </div>
        <button @click="saveArticle" class="sub_btn">保存</button>

        <div v-if="resultUrl">{{resultUrl}}</div>
    </div>
</template>

<script>
    import Topback from "../../components/topback";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import {getArticleDetail, saveArticle} from "../../assets/services/common";
    export default {
        name: "addarticle",
        data(){
            return {
                content:'',
                title:null,
                resultUrl:null,
                articleId:this.$route.query.artid,
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: {
                            handlers: {
                                'image': function () {
                                    window.QuillWatch.emit(this.quill.id)
                                }
                            },
                            container:[
                                ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                                // ["blockquote", "code-block"], // 引用  代码块
                                [{header:1 }, {header:2 }], // 1、2 级标题
                                [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                                // [{ script: "sub" }, { script: "super" }], // 上标/下标
                                [{ indent: "-1" }, { indent: "+1" }], // 缩进
                                // [{'direction': 'rtl'}],                         // 文本方向
                                // [{ size: ["small", false, "large", "huge"] }], // 字体大小
                                // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                                // [{ font: [] }], // 字体种类
                                // [{ align: [] }], // 对齐方式
                                ["clean"], // 清除文本格式
                                ["link", "image", "video"]// 链接、图片、视频
                            ]
                        }
                        ,
                        ImageExtend: {
                            loading: true,
                            name: 'file',              // 后端接收的文件名称
                            action: 'https://www.djtp.com/api/image/upload', // 后端接收文件api
                            response: (res) => {
                                return res.data // 此处返回的值一定要直接是后端回馈的图片在服务器的存储路径如：/images/xxx.jpg
                            }
                        },
                    }
                }
            }

        },
        methods:{
            async saveArticle(){
                if(!this.title){
                    this.$toast({
                        message: '请输入标题',
                        duration: 1500
                    })
                    return;
                }
                let res = await saveArticle({
                    title:this.title,
                    pageText:this.content,
                    id:this.articleId
                })
                if (res.data > 0) {
                    this.$router.push({name:'business-article'})
                }else{
                    this.$toast({
                        message: '发布失败',
                        duration: 1500
                    })
                }
            },
            async getById(){
                let res = await getArticleDetail({
                    id:this.articleId
                })
                this.title = res.data.title
                this.content = res.data.pageText
            }
        },
        mounted(){
            this.getById()
        },
        components: {Topback}
    }
</script>

<style scoped>
    .sub_btn{
        width:2.5rem;
        background-color: white;
        border:1px solid #2cbe4e;
        height:0.6rem;
        margin-right:20px;
        margin-top:15px;
        float:right;
    }
</style>
<style>
    .ql-toolbar,.ql-editor{
        background-color: white;
    }
</style>