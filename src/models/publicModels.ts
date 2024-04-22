import { useRequest } from "ahooks";
import { getAvatarService } from '../service/publicService'


const publicModels = () => {
    // 获取头像信息
    const {
        run: getAvatar,
        data: avatarImger,
        loading: getAvatarLoading
    } = useRequest(getAvatarService, {
        manual: true
    })


    return {
        getAvatar,
        avatarImger,
        getAvatarLoading
    }
}

export default publicModels