// 写入tsx
function templateTsx () {
    const str = 
    `import React, { Component } from 'react';
import { connect } from 'dva';
import * as styles from './index.less'
import { getStorage } from '@/utils/common.ts'
import { registerApp, H5CloseBtn, titleBack, openRecruit } from '@/utils/appAgreement'
import { bdCommonQuick, bdCommonTrack } from '@/utils/bdCourier'

interface MyProps {
    dispatch: any,
    history: any
}
interface MyState {
    traineeScene: number
}
class MainBody extends Component<MyProps, MyState> {
    public state: MyState = {
        traineeScene: Number(getStorage('traineeScene'))
    }
    public componentDidMount() {
        
    }
    public render() {
        return (
            <div >
                
            </div>
        )
    }
}
function mapStateProps(state: any) {
    return {
        categroyData: state.shansongStudy.categroyData,
    };
}
const TestSuccess = connect(mapStateProps)(MainBody);
export default TestSuccess`
    return str
}
module.exports = templateTsx