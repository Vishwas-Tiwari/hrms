package hrms;

public class Assessment {

    private int employeeId;
    private String selfAssessment;
    private String achievements;
    private String goals;

    public Assessment() {
    }

    public Assessment(int employeeId, String selfAssessment,
                      String achievements, String goals) {
        this.employeeId = employeeId;
        this.selfAssessment = selfAssessment;
        this.achievements = achievements;
        this.goals = goals;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getSelfAssessment() {
        return selfAssessment;
    }

    public void setSelfAssessment(String selfAssessment) {
        this.selfAssessment = selfAssessment;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }
}