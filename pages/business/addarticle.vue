<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
    <!--  新增活动页面 -->
    <div class="my-add-article">

        <topback />

        <van-cell title="新增活动" style="margin-bottom:10px;" />
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
    import {saveArticle} from "../../assets/services/common";
    export default {
        name: "addarticle",
        data(){
            return {
                content:'',
                title:null,
                resultUrl:null,
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
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
                    pateText:this.content
                })
                console.log(res)

            }
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