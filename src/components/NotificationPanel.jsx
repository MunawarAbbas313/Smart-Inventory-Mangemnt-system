import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Tag, Button, Empty } from 'antd';
import {
    BellOutlined,
    WarningOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    FireOutlined,
} from '@ant-design/icons';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../services/api';

const severityConfig = {
    warning: { color: 'orange', icon: <WarningOutlined /> },
    error: { color: 'red', icon: <CloseCircleOutlined /> },
    info: { color: 'blue', icon: <InfoCircleOutlined /> },
    success: { color: 'green', icon: <CheckCircleOutlined /> },
};

const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const unreadCount = notifications.filter(n => !n.read).length;

    const loadNotifications = async () => {
        try {
            const { data } = await getNotifications();
            setNotifications(data);
        } catch { }
    };

    useEffect(() => {
        loadNotifications();
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkRead = async (id) => {
        await markNotificationRead(id);
        loadNotifications();
    };

    const handleMarkAllRead = async () => {
        await markAllNotificationsRead();
        loadNotifications();
    };

    const getTypeIcon = (type) => {
        if (type === 'low_stock') return <WarningOutlined style={{ color: '#ff6b35' }} />;
        if (type === 'out_of_stock') return <CloseCircleOutlined style={{ color: '#ff1744' }} />;
        if (type === 'expiry') return <WarningOutlined style={{ color: '#ffab00' }} />;
        if (type === 'demand_spike') return <FireOutlined style={{ color: '#ff6b35' }} />;
        if (type === 'po_update') return <InfoCircleOutlined style={{ color: '#1976d2' }} />;
        return <InfoCircleOutlined />;
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <>
            <div className="notification-bell" onClick={() => { setOpen(true); loadNotifications(); }}>
                <Badge count={unreadCount} size="small" offset={[-2, 2]}>
                    <BellOutlined style={{ fontSize: 20, cursor: 'pointer', color: '#0a2540' }} />
                </Badge>
            </div>

            <Drawer
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🔔 Notifications</span>
                        {unreadCount > 0 && (
                            <Button size="small" type="link" onClick={handleMarkAllRead}>
                                Mark all read
                            </Button>
                        )}
                    </div>
                }
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
                width={380}
            >
                {notifications.length === 0 ? (
                    <Empty description="No notifications" />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {notifications.map(n => {
                            const sev = severityConfig[n.severity] || severityConfig.info;
                            return (
                                <div
                                    key={n._id}
                                    className={`notification-item ${!n.read ? 'unread' : ''}`}
                                    onClick={() => !n.read && handleMarkRead(n._id)}
                                    style={{
                                        padding: '12px 14px',
                                        borderRadius: 10,
                                        background: n.read ? '#f8fafc' : '#fff5f0',
                                        border: `1px solid ${n.read ? '#e2e8f0' : '#ffccbc'}`,
                                        cursor: n.read ? 'default' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                        <span style={{ fontSize: 18, marginTop: 2 }}>{getTypeIcon(n.type)}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <strong style={{ fontSize: 13 }}>{n.title}</strong>
                                                {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b35', flexShrink: 0 }} />}
                                            </div>
                                            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                                                {n.message}
                                            </p>
                                            <span style={{ fontSize: 11, color: '#94a3b8' }}>{timeAgo(n.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default NotificationPanel;
