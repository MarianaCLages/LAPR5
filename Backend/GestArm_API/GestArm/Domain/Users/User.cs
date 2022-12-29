using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

    public class User : Entity<UserID>, IAggregateRoot
    {
        public User()
        {
        }

        public User(UserName name, UserEmail email, UserRole role, UserPhoneNumber phoneNumber, UserBirthDate birthDate)
        {
            Id = new UserID(Guid.NewGuid().ToString());
            Name = name;
            Email = email;
            Role = role;
            PhoneNumber = phoneNumber;
            BirthDate = birthDate;
            Activated = new UserActivate(true);
        }
        
        public UserID Id { get;}

        public UserName Name { get; private set; }

        public UserEmail Email { get; private set; }

        public UserRole Role { get; private set; }

        public UserPhoneNumber PhoneNumber { get; private set; }

        public UserBirthDate BirthDate { get; private set; }

        public UserActivate Activated { get; private set; }

        public void ActivateUser()
        {
            Activated.ActivateUser();
        }

        public void DesactivateUser()
        {
            Activated.DesactivateUser();
        }

        public void ChangeActivated(UserActivate activated)
        {
            Activated = activated;
        }

        public void ChangeName(UserName name)
        {
            Name = name;
        }

        public void ChangeEmail(UserEmail email)
        {
            Email = email;
        }

        public void ChangeRole(UserRole role)
        {
            Role = role;
        }

        public void ChangePhoneNumber(UserPhoneNumber phoneNumber)
        {
            PhoneNumber = phoneNumber;
        }

        public void ChangeBirthDate(UserBirthDate birthDate)
        {
            BirthDate = birthDate;
        }

        public String GetHashCodeName()
        {
            string hash = "";
            for (int i = 0; i < 5; i++)
            {
                hash += (char)('A' + (i + GetHashCode()) % 26);
            }

            return hash;
        }


        public override int GetHashCode()
        {
            return HashCode.Combine(PhoneNumber.ToString().Substring(0, 8));
        }
    
}