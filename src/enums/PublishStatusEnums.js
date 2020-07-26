export default class PublishStatusEnums {
    static isPublishStatus(val) {
        const map = new Map();
        map.set(0,'草稿箱');
        map.set(1,'未发布');
        map.set(2,'已发布');
        return map.get(val);
    }
}
