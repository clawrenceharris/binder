/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase/compat';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  Modal: undefined;
  ClassChatRoom: undefined;
  Chat: undefined;
  GroupChat: undefined;


};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type BottomTabParamList = {
  Home: undefined;
  Playground: undefined;
  Desk: undefined;
  Chat: undefined;
  ClassChatRoom: undefined;
  GroupChat: undefined;

  Classes: undefined;


};
export type School = {
  id: string,
  name: string,
  type: string,
  location: string
  users: User[],
  active: User[]
}


export type TopTabParamList = {
  Classes: undefined;
  Announcements: undefined;
  Classmates: undefined;
  Calendar: undefined;
  GroupChat: undefined;


};



export type HomeParamList = {
  HomeScreen: undefined
}

export type User = {

  uid: string,
  displayName: string,
  photoURL: string,
  birthday: Date,
  gpa: string,
  gradYear: string,
  school: School,
  lastActive: Date,
  studyBuddies: [],
  friends: [],
  classes: []
}

export type Chatroom = {
  users: User[];
  chats: Chat[];
  type: string;
  name: string;

}



export type Class = {

  users: [User];
  name: string;
  chatrooms: Chatroom;
  announcements: [];
  photoURL: string;
  active: [];
  room: string;
  building: string;
  startDate: Date;
  endDate: Date;
  teacher: string;
  description: string;

}



export type ChatroomUser = {

  uid: string,
  displayName: string,
  photoURL: string,
  birthday: Date,
  gpa: string,
  gradYear: string,
  school: School,
  lastActive: Date,
  studyBuddies: [],
  friends: [],
  classes: []
  color: string;


}

export type Chat = {
  user: ChatUser;
  id: string;
  text: string;
  contentType: string;
  createdAt: firebase.firestore.FieldValue;
  isSystem: boolean;
  deskItem: DeskItem;
  poll: Poll;
  reactions: Reaction[];
  burningQuestion: object;

}

export type Reaction = {
  reaction: string;
  user: ChatUser;
}


export type Announcement = {

  title: string;
  dueDate: Date;
  timestamp: Date;

}

export type DeskItem = {

  category: string;
  title: string;
  likes: User[];
  views: User[];
  comments: User[];
  section: string;
  sectionNumber: number;
  files: string[];
  ownerUID: string;
  timestamp: Date;
  isPublic: boolean;



}
export type ChatUser = {
  uid: string;
  photoURL: string;
  displayName: string;

}
export type Flashcards = {

  title: string;
  likes: User[];
  views: User[];
  comments: User[];
  section: string;
  cards: Flashcard[];
  ownerUID: string;
  timestamp: Date;
  isPublic: boolean;
  sectionNumber: number;



}

export type Flashcard = {
  cardFront: string;
  cardBack: string;
}



export type BurningQuestion = {
  title: string;
  question: string;
  tags: string[];
  isAnonymous: boolean;
  createdAt: Date;

}
export type Poll = {

  title: string;
  user: User;
  options: PollOption[]
  timestamp: Date;
  totalVotes: number;




}

export type PollOption = {
  option: string;
  votes: User[];

}



export type RootTabScreenProps<Screen extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
