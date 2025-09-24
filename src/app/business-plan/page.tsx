'use client'

import React from 'react'
import MarkdownViewer from '@/components/ui/MarkdownViewer'

const BusinessPlanPage: React.FC = () => {
    return (
        <MarkdownViewer
            filename="businessPlan.md"
            title="Digital City Series Business Plan"
        />
    )
}

export default BusinessPlanPage