import React from 'react';
import { Skeleton } from 'antd';

const LoadingSkeleton = ({ children, ...rest }: { children: React.ReactElement }) => {
    return <Skeleton  {...rest}>
        {children}
    </Skeleton> 
};

export default LoadingSkeleton;


