// Mock API Service for Burgers Portal
export const INITIAL_USERS = [
  {
    id: 1,
    name: "Alex Martinez",
    username: "alex.chef",
    email: "alex.martinez@burgerhub.io",
    phone: "+1-555-0142",
    address: "742 Evergreen Terrace, Springfield, OR",
    role: "Head Chef",
    status: "Active",
    ordersCount: 142,
    favoriteBurger: "Truffle Umami Bacon Burger",
    avatarBg: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    bio: "Obsessed with perfect sear, brioche chemistry, and secret sauce crafting."
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    email: "sarah.chen@burgerhub.io",
    phone: "+1-555-0189",
    address: "10880 Wilshire Blvd, Los Angeles, CA",
    role: "Store Manager",
    status: "Active",
    ordersCount: 89,
    favoriteBurger: "Spicy Jalapeño Crunch",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bio: "Oversees daily kitchen workflow and high-volume burger prep lines."
  },
  {
    id: 3,
    name: "Marcus Vance",
    username: "marcus_v",
    email: "marcus.vance@burgerhub.io",
    phone: "+1-555-0164",
    address: "350 5th Ave, New York, NY",
    role: "Food Critic",
    status: "Active",
    ordersCount: 64,
    favoriteBurger: "Classic Double Smash Cheddar",
    avatarBg: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    bio: "Evaluating patty thickness, melt factor, and crispy edges since 2018."
  },
  {
    id: 4,
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena.rostova@burgerhub.io",
    phone: "+1-555-0118",
    address: "221B Baker St, Marylebone, London",
    role: "Shift Lead",
    status: "On Break",
    ordersCount: 118,
    favoriteBurger: "Smoky BBQ Onion Ring Melt",
    avatarBg: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    bio: "Specialist in grill management, order pacing, and team leadership."
  },
  {
    id: 5,
    name: "Devon Miller",
    username: "devon_plant",
    email: "devon.m@burgerhub.io",
    phone: "+1-555-0152",
    address: "450 Market St, San Francisco, CA",
    role: "VIP Member",
    status: "Active",
    ordersCount: 52,
    favoriteBurger: "Plant-Based Avocado Stack",
    avatarBg: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    bio: "Proud plant-based burger enthusiast exploring every vegan specialty."
  },
  {
    id: 6,
    name: "Priya Sharma",
    username: "priyasharma",
    email: "priya.s@burgerhub.io",
    phone: "+1-555-0175",
    address: "12 Kingfisher Way, Seattle, WA",
    role: "Sous Chef",
    status: "Active",
    ordersCount: 175,
    favoriteBurger: "Chipotle Gouda Brioche",
    avatarBg: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)",
    bio: "Grill artisan crafting gourmet aiolis and house-pickled toppings."
  }
];

let localUsersStore = [...INITIAL_USERS];

/**
 * Simulates an asynchronous API network call to fetch users.
 * @param {Object} options
 * @param {number} options.delay - Artificial latency in ms (default 650ms)
 * @param {boolean} options.shouldFail - Trigger simulated 500 network error
 * @returns {Promise<Array>}
 */
export async function fetchUsersApi({ delay = 650, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("503 Service Unavailable: Simulated Burgers API endpoint failure."));
      } else {
        resolve({
          status: 200,
          timestamp: new Date().toISOString(),
          data: [...localUsersStore]
        });
      }
    }, delay);
  });
}

/**
 * Simulates creating a new user in the mock database
 */
export async function createUserApi(newUser) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const created = {
        ...newUser,
        id: Date.now(),
        ordersCount: 1,
        avatarBg: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
      };

      console.log(`[API Mock] New member registered: Name=${created.name}, Email=${created.email}, Phone=${created.phone}, Address=${created.address}`);

      localUsersStore = [created, ...localUsersStore];
      resolve(created);
    }, 400);
  });
}

/**
 * In-memory client mock storage helper to increment order count.
 * @param {number} userId - The numeric ID of the user.
 * @returns {Promise<Object>} Resolves with the updated user record.
 */
export async function incrementOrdersApi(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numericId = Number(userId);
      const index = localUsersStore.findIndex((u) => u.id === numericId);
      if (index === -1) {
        reject(new Error(`User with ID ${userId} not found`));
        return;
      }

      const updated = {
        ...localUsersStore[index],
        ordersCount: (localUsersStore[index].ordersCount || 0) + 1
      };

      localUsersStore = [
        ...localUsersStore.slice(0, index),
        updated,
        ...localUsersStore.slice(index + 1)
      ];

      resolve(updated);
    }, 200);
  });
}

/**
 * Reset mock storage back to initial sample state
 */
export function resetUsersApi() {
  localUsersStore = [...INITIAL_USERS];
}

