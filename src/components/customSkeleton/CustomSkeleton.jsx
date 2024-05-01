import { Skeleton } from "antd"

const CustomSkeleton = () => {
    return (
        <div style={{ padding: 16, border: '1px solid #ccc', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Skeleton.Image active size="large" shape="round" style={{ width: 149, height: 165 }} />
            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Skeleton.Input active size="small" style={{ width: 200 }} />
                <Skeleton.Input active size="small" style={{ width: 100 }} />
                <Skeleton.Input active size="small" style={{ width: '100%' }} />
                <Skeleton.Input active size="small" style={{ width: '100%' }} />
            </div>
        </div>
    )
}
export default CustomSkeleton;