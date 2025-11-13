import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// Make sure to install @react-native-picker/picker
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Shared Menu Context
type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: string;
  price: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const MenuContext = createContext<MenuContextType | null>(null);
const useMenu = () => useContext(MenuContext)!;

// Navigation Tabs
const Tab = createBottomTabNavigator();

// Home Screen
function HomeScreen() {
  const { menuItems } = useMenu();

  // Calculate average prices per course
  const courses = ["Starters", "Mains", "Dessert"];
  const averages = courses.map((course) => {
    const items = menuItems.filter((i) => i.course === course);
    if (items.length === 0) return { course, avg: 0 };
    const total = items.reduce((sum, i) => sum + parseFloat(i.price), 0);
    return { course, avg: total / items.length };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Christoffel's Menu</Text>
          <Text style={styles.bannerSubText}>Fine Dining at Your Fingertips</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Average Price by Course</Text>
          {averages.map((a) => (
            <Text key={a.course} style={styles.averageText}>
              {a.course}: R{a.avg.toFixed(2)}
            </Text>
          ))}
        </View>

        <Text style={styles.totalText}>Total Menu Items: {menuItems.length}</Text>

        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuCourse}>{item.course}</Text>
            </View>
            <Text style={styles.menuDescription}>{item.description}</Text>
            <Text style={styles.menuPrice}>R{item.price}</Text>
          </View>
        ))}

        {menuItems.length === 0 && (
          <Text style={styles.emptyText}>No dishes yet — start adding!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

//Chef's Screen
function ChefScreen() {
  const { menuItems, setMenuItems } = useMenu();
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starters");
  const [price, setPrice] = useState("");
  const courses = ["Starters", "Mains", "Dessert"];
  const addMenuItem = () => {
    if (!dishName || !description || !price) return;
    const newItem: MenuItem = {
      id: Date.now(),
      name: dishName,
      description,
      course,
      price,
    };
    setMenuItems([...menuItems, newItem]);
    setDishName("");
    setDescription("");
    setPrice("");
    setCourse("Starters");
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((i) => i.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Chef's Menu Editor</Text>
            <Text style={styles.bannerSubText}>
              Add or remove dishes for the restaurant
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add a New Dish</Text>

            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              placeholderTextColor="#8A817C"
              value={dishName}
              onChangeText={setDishName}
            />
            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Description"
              placeholderTextColor="#8A817C"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.label}>Select Course</Text>
            <Picker
              selectedValue={course}
              onValueChange={(value) => setCourse(value)}
              style={styles.picker}
              dropdownIconColor="#5A3E36"
            >
              {courses.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Price (R)"
              placeholderTextColor="#8A817C"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={addMenuItem}>
              <Text style={styles.buttonText}>➕ Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.totalText}>
            Current Items: {menuItems.length}
          </Text>

          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.menuTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeMenuItem(item.id)}>
                  <Ionicons name="trash" size={20} color="#D2691E" />
                </TouchableOpacity>
              </View>
              <Text style={styles.menuCourse}>{item.course}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <Text style={styles.menuPrice}>R{item.price}</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//Guest Screen
function GuestScreen() {
  const { menuItems } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState("All");
  const courses = ["All", "Starters", "Mains", "Dessert"];

  const filteredItems =
    selectedCourse === "All"
      ? menuItems
      : menuItems.filter((i) => i.course === selectedCourse);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Guest Menu View</Text>
          <Text style={styles.bannerSubText}>
            Filter and explore our dishes
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Filter by Course</Text>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(value) => setSelectedCourse(value)}
            style={styles.picker}
            dropdownIconColor="#5A3E36"
          >
            {courses.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        {filteredItems.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuCourse}>{item.course}</Text>
            </View>
            <Text style={styles.menuDescription}>{item.description}</Text>
            <Text style={styles.menuPrice}>R{item.price}</Text>
          </View>
        ))}

        {filteredItems.length === 0 && (
          <Text style={styles.emptyText}>No dishes found for this course.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

//App root
export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }: { route: { name: string } }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#D2691E",
            tabBarInactiveTintColor: "#8A817C",
            tabBarStyle: { backgroundColor: "#FFF4EA" },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => {
              let iconName: any;
              if (route.name === "Home") iconName = "home";
              else if (route.name === "Chef") iconName = "restaurant";
              else iconName = "menu";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chef" component={ChefScreen} />
          <Tab.Screen name="Guest" component={GuestScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuContext.Provider>
  );
}

// Stlyes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F0",
  },
  banner: {
    backgroundColor: "#5A3E36",
    padding: 24,
    borderRadius: 16,
    margin: 16,
    alignItems: "center",
  },
  bannerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F8EDEB",
  },
  bannerSubText: {
    color: "#EDE0D4",
    marginTop: 4,
    fontStyle: "italic",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5A3E36",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F3F0EE",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#3E3E3E",
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  label: {
    fontWeight: "600",
    color: "#5A3E36",
    marginBottom: 4,
    marginTop: 8,
  },
  picker: {
    backgroundColor: "#F3F0EE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D2691E",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5A3E36",
    textAlign: "center",
    marginBottom: 10,
  },
  averageText: {
    textAlign: "center",
    color: "#3E3E3E",
    fontSize: 16,
    marginVertical: 4,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  menuCourse: {
    fontStyle: "italic",
    color: "#8B6B61",
  },
  menuDescription: {
    color: "#555",
    marginBottom: 8,
  },
  menuPrice: {
    fontWeight: "bold",
    color: "#D2691E",
    fontSize: 16,
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    color: "#8A817C",
    marginTop: 20,
    fontStyle: "italic",
  },
});
