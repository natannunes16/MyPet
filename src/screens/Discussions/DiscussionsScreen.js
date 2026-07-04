import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';
import MainHeader from '../../components/Header/MainHeader';

export default function DiscussionsScreen({ navigation }) {
  const { discussions, loadingDiscussions, fetchDiscussions, deleteDiscussion } = useFeed();
  const { profile } = usePet();

  const confirmDeleteDiscussion = (id) => {
    Alert.alert('Excluir Discussão', 'Tem certeza que deseja excluir esta discussão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deleteDiscussion(id) }
    ]);
  };

  const renderItem = ({ item }) => {
    const discussionId = item._id || item.id;
    const currentUserId = profile?._id || profile?.id;
    const isMyDiscussion = item.authorId === currentUserId;

    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DiscussionDetail', { discussionId })}
      >
        <View style={[styles.header, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={{ uri: (isMyDiscussion && profile?.avatar) ? profile.avatar : (item.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80') }} style={styles.avatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.subtitle}>{(isMyDiscussion && profile?.name) ? profile.name : (item.author || 'Usuário')}</Text>
                {item.category && (
                  <>
                    <Text style={styles.dot}> • </Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
          {isMyDiscussion && (
            <TouchableOpacity onPress={() => confirmDeleteDiscussion(discussionId)} style={{ padding: 5, alignSelf: 'flex-start' }}>
              <Ionicons name="trash-outline" size={20} color={colors.error || '#D32F2F'} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader subtitle="discussões" navigation={navigation} />
      {loadingDiscussions ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 10, color: colors.textLight }}>Carregando discussões...</Text>
        </View>
      ) : (
        <FlatList
          data={discussions}
          keyExtractor={(item) => item._id || item.id || Math.random().toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Ionicons name="chatbubbles-outline" size={48} color={colors.border} />
              <Text style={{ marginTop: 12, color: colors.textLight, fontSize: 16 }}>Nenhuma discussão criada ainda.</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchDiscussions}
          refreshing={loadingDiscussions}
        />
      )}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreateDiscussion')}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dot: {
    fontSize: 12,
    color: colors.textLight,
    marginHorizontal: 4,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
