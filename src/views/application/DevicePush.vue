<template>
    <div class="devicepush">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-cloudy"/> 应用云</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-s-promotion"/> 物模型推送</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-switch
                    style="display: block"
                    v-model="notepushVO.Clock"
                    active-text="时钟更新"
                    active-value="1"
                    inactive-value="0">
            </el-switch>
            <el-switch
                    style="display: block"
                    v-model="notepushVO.Weather"
                    active-text="天气更新"
                    active-value="1"
                    inactive-value="0">
            </el-switch>

            <el-switch
                    style="display: block"
                    v-model="notepushVO.FestivalBroadcastPush"
                    active-text="节日播报更新"
                    active-value="1"
                    inactive-value="0">
            </el-switch>

            <el-switch
                    style="display: block"
                    v-model="notepushVO.ShortMessage"
                    active-text="短消息更新"
                    active-value="1"
                    inactive-value="0"
                    :disabled="smUpdatedisabled">
            </el-switch>

            <el-switch
                    style="display: block"
                    v-model="notepushVO.ShortMessage"
                    active-text="短消息删除"
                    active-value="2"
                    inactive-value="0"
                    :disabled="smDeletedisabled">
            </el-switch>

            <el-switch
                    style="display: block"
                    v-model="notepushVO.VoiceFirmware"
                    active-text="语音固件更新"
                    active-value="1"
                    inactive-value="0">
            </el-switch>

            <el-button type="primary" @click="push" round><span
                    style="font-style: normal;color: #e9eef3;font-size: 17px">推送物模型</span></el-button>
        </div>
    </div>
</template>

<style scoped>
    .el-switch {
        margin-top: 30px;
        margin-left: 200px;
    }

    .el-button {
        height: 50px;
        width: 120px;
        margin-top: 30px;
        margin-left: 200px;
    }

</style>

<script>
    import devicePush from "../../api/application/devicepush"

    export default {
        name: "",
        data() {
            return ({
                notepushVO: {
                    FestivalBroadcastPush: '0',
                    ShortMessage: '0',
                    Weather: '0',
                    Clock: '0',
                    VoiceFirmware: '0'
                },
                value: false,
                disabled: false,
                smUpdatedisabled: false,
                smDeletedisabled: false
            })
        },
        methods: {
            push() {
                devicePush.notePush(this.notepushVO).then(res => {
                    let data = res.data;
                    this.$message({
                        type: "success",
                        message: data
                    })
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        computed: {},
        watch: {
            'notepushVO.ShortMessage'(val) {
                if (val === '1') {
                    this.smDeletedisabled = true
                } else if (val === '2') {
                    this.smUpdatedisabled = true
                } else {
                    this.smDeletedisabled = false;
                    this.smUpdatedisabled = false
                }
                // console.log("***isShortMessagePush:" + this.isShortMessagePush)
                // console.log("***smDeletedisabled:" + this.smDeletedisabled)
                // console.log("***smUpdatedisabled:" + this.smUpdatedisabled)
            }
        }
    }

</script>
