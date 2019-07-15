import request from '@/plugin/axios'

export function AccountLogin(data) {
    return request({
        url: '/oauth/token',
        method: 'post',
        data
    })
}

export function GetUserInfo(data) {
    return request({
        url: '/user/me',
        method: 'get',
        data
    })
}
