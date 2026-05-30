import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function MainHeader({ 
  title = "MyPet", 
  subtitle, 
  showBack = false, 
  navigation,
  showBell = true,
  hasUnreadNotifications = true // defaulting to true for the sake of the mockup
}) {
  return (
    <View style={styles.navHeader}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}
      
      <View style={styles.titleContainer}>
        <Text style={styles.navTitle}>{title}</Text>
        {subtitle && <Text style={styles.navSubtitle}>{subtitle}</Text>}
      </View>

      {showBell ? (
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => navigation?.navigate('Notifications')}
        >
          <View>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            {hasUnreadNotifications && <View style={styles.notificationDot} />}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSpacer: { 
    width: 32,
  },
  iconBtn: { 
    padding: 4 
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  navSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D32F2F',
    borderWidth: 1,
    borderColor: '#FFF',
  },
});
