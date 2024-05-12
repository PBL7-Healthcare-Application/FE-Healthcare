import { Image } from 'antd'
import './List.scss'
import personDefault from '../../../assets/images/personDefault.png'


const ItemUser = () => {
    return (
        <div className='listUser-item'>
            <Image fallback={personDefault} width={40} preview={false} style={{ borderRadius: '50%' }} />
            <div className='listUser-item__texts'>
                <span className='listUser-item__name' style={{ fontSize: 15 }}>Jane Coe</span>
                <p className='listUser-item__name' style={{ fontWeight: 400, fontSize: 12, color: '#a5a5a5' }}>Hi, how are you?</p>
            </div>
        </div>
    )
}

export default ItemUser