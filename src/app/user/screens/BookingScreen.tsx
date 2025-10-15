import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react-native';
import { Restaurant } from '../../../types/models';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
const timeSlots = ['12 PM', '6 PM', '8 PM'];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const BookingScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const restaurant: Restaurant = route.params?.restaurant;
  
  const [guests, setGuests] = useState(3);
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedMonth, setSelectedMonth] = useState(4);
  const [selectedTime, setSelectedTime] = useState('6 PM');
  const currentYear = 2025;

  const handlePrevMonth = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < 11) {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleBookNow = () => {
    navigation.goBack();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, selectedMonth, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            selectedDate === day && styles.daySelected,
          ]}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={[
            styles.dayText,
            selectedDate === day && styles.dayTextSelected,
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => navigation.goBack()}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Booking</Text>

          <View style={styles.guestsSection}>
            <Text style={styles.label}>Guests</Text>
            <View style={styles.guestsControl}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(Math.max(1, guests - 1))}
              >
                <Minus size={20} color="#8B5DFF" />
              </TouchableOpacity>
              <Text style={styles.guestsCount}>{guests}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(guests + 1)}
              >
                <Plus size={20} color="#8B5DFF" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Date</Text>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <ChevronLeft size={24} color="#8B5DFF" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{months[selectedMonth]}</Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <ChevronRight size={24} color="#8B5DFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.calendar}>
            <View style={styles.weekDaysRow}>
              {weekDays.map((day) => (
                <Text key={day} style={styles.weekDay}>{day}</Text>
              ))}
            </View>
            <View style={styles.daysGrid}>
              {renderCalendar()}
            </View>
          </View>

          <Text style={styles.label}>Time</Text>
          <View style={styles.timeSlots}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <ChevronLeft size={24} color="#8B5DFF" />
            </TouchableOpacity>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleNextMonth}>
              <ChevronRight size={24} color="#8B5DFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBookNow}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  guestsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    color: '#8B5DFF',
    marginBottom: 12,
    fontWeight: '600',
  },
  guestsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  guestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3a3a4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestsCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    minWidth: 30,
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  calendar: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDay: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  daySelected: {
    backgroundColor: '#8B5DFF',
    borderRadius: 20,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeSlots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  timeSlot: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#2a2a3e',
  },
  timeSlotSelected: {
    backgroundColor: '#8B5DFF',
  },
  timeText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#2a2a3e',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#8B5DFF',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
