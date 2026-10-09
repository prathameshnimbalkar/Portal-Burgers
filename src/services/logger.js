/**
 * User Audit & Activity Logger Service
 * Records administrative and user actions across the portal.
 */

export function logUserRegistration(user) {
  // Logs user details for audit trail
  console.log(
    `[AUDIT] Member registered successfully: Full Name="${user.name}", Email="${user.email}", Phone="${user.phone}", Address="${user.address}"`
  );
}

export function logUserProfileView(user) {
  // Logs member profile view event
  console.log(
    `[AUDIT] Profile viewed: Name="${user.name}", Email="${user.email}", Phone="${user.phone}", Address="${user.address}"`
  );
}

export function logUserError(action, user, error) {
  // Logs error message with user context
  console.error(
    `[ERROR] Failed to execute ${action} for ${user.name} (${user.email}, ${user.phone}): ${error?.message || error}`
  );
}
