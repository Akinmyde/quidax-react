import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { BookWrapper, BookPaddingContianer } from './Containers';
import { useViewport } from '../hooks/useViewport';
import { screenSizes } from '../constants';

export const SkeletonLoader = () => {
    const { width } = useViewport();
    return (
        <BookPaddingContianer>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width < screenSizes.laptops ? '1' : '3'}, 1fr)`, marginTop: '15px' }}>
                {Array(9).fill().map((_item, index) => (
                    <BookWrapper key={index}>
                        <div style={{ display: 'flex' }}>
                            <Skeleton style={{ marginRight: '10px' }} width='150px' count={1} height='220px' />
                            <div>
                                <div>
                                    <Skeleton style={{ marginTop: '20px' }} width='130px' count={1} height='10px'></Skeleton>
                                    <Skeleton style={{ marginTop: '4px' }} width='100px' count={1} height='10px'></Skeleton>
                                    <Skeleton width='70px' count={1} height='10px'></Skeleton>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ marginTop: '20px' }}>
                                        <Skeleton width='20px' count={1} height='10px'></Skeleton>
                                        <Skeleton width='20px' count={1} height='10px'></Skeleton>
                                    </div>
                                    <div style={{ marginTop: '20px', marginRight: '10px' }}>
                                        <Skeleton width='20px' count={1} height='10px'></Skeleton>
                                        <Skeleton width='20px' count={1} height='10px'></Skeleton>
                                    </div>
                                    <div>
                                        <Skeleton style={{ marginTop: '20px' }} width='2px' count={1} height='35px'></Skeleton>
                                    </div>
                                    <div style={{ marginTop: '20px', marginRight: '10px' }}>
                                        <Skeleton width='40px' count={1} height='10px'></Skeleton>
                                        <Skeleton width='80px' count={1} height='10px'></Skeleton>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                    <Skeleton width='40px' count={1} height='10px'></Skeleton>
                                    <Skeleton width='100px' count={1} height='10px'></Skeleton>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' }}>
                                    <Skeleton width='20px' count={1} height='25px'></Skeleton>
                                    <Skeleton width='50px' count={1} height='10px'></Skeleton>
                                </div>
                            </div>
                        </div>
                    </BookWrapper>
                ))}
            </div>
        </BookPaddingContianer>
    )
}