namespace API.Entities;
    public class Hero
    {
        public int Id { get; set; }
        public int MinimumRoll { get; set; }
        public int MaximumRoll { get; set; }
        public int RollAmount { get; set; }
        public string HeroName { get; set; }
    }
