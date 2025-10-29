import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DateTimePickerModal = ({
    visible,
    onClose,
    onConfirm,
    startDate = new Date(),
    endDate = null,
    mode = 'range'
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(endDate);
    const [selectingStart, setSelectingStart] = useState(true);

    const [startTime, setStartTime] = useState({
        hour: startDate.getHours() % 12 || 12,
        minute: startDate.getMinutes(),
        period: startDate.getHours() >= 12 ? 'pm' : 'am',
    });

    const [endTime, setEndTime] = useState({
        hour: endDate ? (endDate.getHours() % 12 || 12) : 5,
        minute: endDate ? endDate.getMinutes() : 30,
        period: endDate ? (endDate.getHours() >= 12 ? 'pm' : 'am') : 'pm',
    });

    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        if (visible) {
            setSelectedStartDate(startDate || new Date());
            setSelectedEndDate(endDate);
            setSelectingStart(true);
        }
    }, [visible]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Helper function to check if a date is in the past
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return checkDate < today;
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Previous month days
        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthDays - i),
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: new Date(year, month, i),
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i),
            });
        }

        return days;
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateSelect = (date) => {
        if (!date.isCurrentMonth) return;

        // Prevent selecting past dates
        if (isPastDate(date.date)) return;

        if (selectingStart) {
            // First click: set pickup date
            setSelectedStartDate(date.date);
            setSelectedEndDate(null);
            setSelectingStart(false);
        } else {
            // Second click: set return date
            if (!selectedEndDate) {
                // If no return date yet, set it
                if (date.date < selectedStartDate) {
                    // If clicked date is before start, swap them
                    setSelectedEndDate(selectedStartDate);
                    setSelectedStartDate(date.date);
                } else {
                    setSelectedEndDate(date.date);
                }
            } else {
                // Third click and onwards: reset and start new selection
                setSelectedStartDate(date.date);
                setSelectedEndDate(null);
                setSelectingStart(false);
            }
        }
    };


    const isDateInRange = (date) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const start = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate());
        const end = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate());
        return checkDate >= start && checkDate <= end;
    };

    const isStartDate = (date) => {
        if (!selectedStartDate) return false;
        return date.getDate() === selectedStartDate.getDate() &&
            date.getMonth() === selectedStartDate.getMonth() &&
            date.getFullYear() === selectedStartDate.getFullYear();
    };

    const isEndDate = (date) => {
        if (!selectedEndDate) return false;
        return date.getDate() === selectedEndDate.getDate() &&
            date.getMonth() === selectedEndDate.getMonth() &&
            date.getFullYear() === selectedEndDate.getFullYear();
    };

    const handleDone = () => {
        const finalStartDate = new Date(selectedStartDate);
        const finalEndDate = selectedEndDate ? new Date(selectedEndDate) : new Date(selectedStartDate);

        // Apply start time
        let startHour = startTime.hour;
        if (startTime.period === 'pm' && startHour !== 12) {
            startHour += 12;
        } else if (startTime.period === 'am' && startHour === 12) {
            startHour = 0;
        }
        finalStartDate.setHours(startHour);
        finalStartDate.setMinutes(startTime.minute);

        // Apply end time
        let endHour = endTime.hour;
        if (endTime.period === 'pm' && endHour !== 12) {
            endHour += 12;
        } else if (endTime.period === 'am' && endHour === 12) {
            endHour = 0;
        }
        finalEndDate.setHours(endHour);
        finalEndDate.setMinutes(endTime.minute);

        onConfirm(finalStartDate, finalEndDate);
        onClose();
    };

    // Toggle time picker - close if already open, open if closed
    const handleStartTimePress = () => {
        if (showStartTimePicker) {
            setShowStartTimePicker(false);
        } else {
            setShowStartTimePicker(true);
            setShowEndTimePicker(false);
        }
    };

    const handleEndTimePress = () => {
        if (showEndTimePicker) {
            setShowEndTimePicker(false);
        } else {
            setShowEndTimePicker(true);
            setShowStartTimePicker(false);
        }
    };

    const renderDay = ({ item }) => {
        const isStart = isStartDate(item.date);
        const isEnd = isEndDate(item.date);
        const inRange = isDateInRange(item.date);
        const isPast = isPastDate(item.date);

        return (
            <TouchableOpacity
                style={[
                    styles.dayCell,
                    !item.isCurrentMonth && styles.dayInactive,
                    isPast && item.isCurrentMonth && styles.dayPast,
                    inRange && !isPast && styles.dayInRange,
                    (isStart || isEnd) && styles.daySelected,
                ]}
                onPress={() => handleDateSelect(item)}
                disabled={!item.isCurrentMonth || isPast}
            >
                <Text
                    style={[
                        styles.dayText,
                        !item.isCurrentMonth && styles.dayTextInactive,
                        isPast && item.isCurrentMonth && styles.dayTextPast,
                        (isStart || isEnd) && styles.dayTextSelected,
                    ]}
                >
                    {item.day}
                </Text>
            </TouchableOpacity>
        );
    };

    const TimePickerScroll = ({ value, onChange, max, step = 1, type }) => {
        const values = [];
        for (let i = type === 'hour' ? 1 : 0; i <= max; i += step) {
            values.push(i);
        }

        return (
            <ScrollView style={styles.timeScrollContainer} showsVerticalScrollIndicator={false}>
                {values.map((val) => (
                    <TouchableOpacity
                        key={val}
                        style={[
                            styles.timeScrollItem,
                            value === val && styles.timeScrollItemActive,
                        ]}
                        onPress={() => onChange(val)}
                    >
                        <Text
                            style={[
                                styles.timeScrollText,
                                value === val && styles.timeScrollTextActive,
                            ]}
                        >
                            {val.toString().padStart(2, '0')}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Time</Text>

                    {/* Time Selector */}
                    <View style={styles.timeSelector}>
                        <TouchableOpacity
                            style={[styles.timeBox, showStartTimePicker && styles.timeBoxActive]}
                            onPress={handleStartTimePress}
                        >
                            <Ionicons name="time-outline" size={20} color={showStartTimePicker ? "#FFF" : "#000"} />
                            <Text style={[styles.timeText, showStartTimePicker && styles.timeTextActive]}>
                                {startTime.hour.toString().padStart(2, '0')} : {startTime.minute.toString().padStart(2, '0')}
                            </Text>
                            <Text style={[styles.periodText, showStartTimePicker && styles.periodTextActive]}>
                                {startTime.period}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.timeBoxOutline, showEndTimePicker && styles.timeBoxActive]}
                            onPress={handleEndTimePress}
                        >
                            <Ionicons name="time-outline" size={20} color={showEndTimePicker ? "#FFF" : "#000"} />
                            <Text style={[styles.timeTextOutline, showEndTimePicker && styles.timeTextActive]}>
                                {endTime.hour.toString().padStart(2, '0')} : {endTime.minute.toString().padStart(2, '0')}
                            </Text>
                            <Text style={[styles.periodTextOutline, showEndTimePicker && styles.periodTextActive]}>
                                {endTime.period}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Time Picker Scrolls */}
                    {(showStartTimePicker || showEndTimePicker) && (
                        <View style={styles.timePickerContainer}>
                            <TimePickerScroll
                                value={showStartTimePicker ? startTime.hour : endTime.hour}
                                onChange={(val) => {
                                    if (showStartTimePicker) {
                                        setStartTime({ ...startTime, hour: val });
                                    } else {
                                        setEndTime({ ...endTime, hour: val });
                                    }
                                }}
                                max={12}
                                type="hour"
                            />
                            <Text style={styles.timeSeparator}>:</Text>
                            <TimePickerScroll
                                value={showStartTimePicker ? startTime.minute : endTime.minute}
                                onChange={(val) => {
                                    if (showStartTimePicker) {
                                        setStartTime({ ...startTime, minute: val });
                                    } else {
                                        setEndTime({ ...endTime, minute: val });
                                    }
                                }}
                                max={59}
                                step={1}
                                type="minute"
                            />
                            <View style={styles.periodContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.periodButton,
                                        (showStartTimePicker ? startTime.period : endTime.period) === 'am' && styles.periodButtonActive,
                                    ]}
                                    onPress={() => {
                                        if (showStartTimePicker) {
                                            setStartTime({ ...startTime, period: 'am' });
                                        } else {
                                            setEndTime({ ...endTime, period: 'am' });
                                        }
                                    }}
                                >
                                    <Text style={[
                                        styles.periodButtonText,
                                        (showStartTimePicker ? startTime.period : endTime.period) === 'am' && styles.periodButtonTextActive
                                    ]}>AM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.periodButton,
                                        (showStartTimePicker ? startTime.period : endTime.period) === 'pm' && styles.periodButtonActive,
                                    ]}
                                    onPress={() => {
                                        if (showStartTimePicker) {
                                            setStartTime({ ...startTime, period: 'pm' });
                                        } else {
                                            setEndTime({ ...endTime, period: 'pm' });
                                        }
                                    }}
                                >
                                    <Text style={[
                                        styles.periodButtonText,
                                        (showStartTimePicker ? startTime.period : endTime.period) === 'pm' && styles.periodButtonTextActive
                                    ]}>PM</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Calendar Header */}
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={handlePreviousMonth}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.monthYear}>
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </Text>
                        <TouchableOpacity onPress={handleNextMonth}>
                            <Ionicons name="chevron-forward" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Days of Week */}
                    <View style={styles.daysOfWeekContainer}>
                        {daysOfWeek.map((day) => (
                            <View key={day} style={styles.dayOfWeekCell}>
                                <Text style={styles.dayOfWeekText}>{day}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Days */}
                    <FlatList
                        data={generateCalendarDays()}
                        renderItem={renderDay}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={7}
                        scrollEnabled={false}
                        contentContainerStyle={styles.calendarGrid}
                    />

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    timeSelector: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    timeBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        gap: 8,
    },
    timeBoxActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    timeBoxOutline: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        gap: 8,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    timeTextActive: {
        color: '#FFF',
    },
    periodText: {
        fontSize: 14,
        color: '#000',
    },
    periodTextActive: {
        color: '#FFF',
    },
    timeTextOutline: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    periodTextOutline: {
        fontSize: 14,
        color: '#000',
    },
    timePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        height: 120,
        gap: 8,
    },
    timeScrollContainer: {
        height: 120,
        width: 60,
    },
    timeScrollItem: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeScrollItemActive: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
    },
    timeScrollText: {
        fontSize: 18,
        color: '#9CA3AF',
    },
    timeScrollTextActive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    periodContainer: {
        flexDirection: 'column',
        gap: 8,
    },
    periodButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
    },
    periodButtonActive: {
        backgroundColor: '#000',
    },
    periodButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    periodButtonTextActive: {
        color: '#FFF',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    monthYear: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    dayOfWeekCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    dayOfWeekText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    calendarGrid: {
        marginBottom: 20,
    },
    dayCell: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 8,
    },
    daySelected: {
        backgroundColor: '#000',
    },
    dayInRange: {
        backgroundColor: '#E5E7EB',
    },
    dayInactive: {
        opacity: 0.3,
    },
    dayPast: {
        opacity: 0.3,
        backgroundColor: '#F9FAFB',
    },
    dayText: {
        fontSize: 16,
        color: '#000',
    },
    dayTextInactive: {
        color: '#9CA3AF',
    },
    dayTextPast: {
        color: '#D1D5DB',
        textDecorationLine: 'line-through',
    },
    dayTextSelected: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    doneButton: {
        flex: 1,
        backgroundColor: '#000',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
});

export default DateTimePickerModal;
