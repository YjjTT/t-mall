import Mock from 'mockjs';
Mock.mock('/api/user/login', {
    "status": 0,
    "data": {
        "id|1-10": 0,
        "username": "@cname"
    }
})
