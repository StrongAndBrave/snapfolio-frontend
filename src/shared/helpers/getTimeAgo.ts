export const getTimeAgo = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'min', seconds: 60 },
        { name: 'sec', seconds: 1 },
    ];

    for (const unit of units) {
        const interval = Math.floor(diffInSeconds / unit.seconds);
        if (interval >= 1) {
            return `${interval} ${unit.name}${interval !== 1 && unit.name !== 'min' && unit.name !== 'sec' ? 's' : ''} ago`;
        }
    }

    return 'just now';
};
