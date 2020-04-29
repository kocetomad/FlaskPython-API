import user
import numpy

USERS = [
        user.createUser("1", "george.bluth@reqres.in","George","Bluth","https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"),        
        user.createUser("2", "janet.weaver@reqres.in","Janet","Weaver","https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"),
        user.createUser("3", "emma.wong@reqres.in",	"Emma",	"Wong",	"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"),
        user.createUser("4", "eve.holt@reqres.in", "Eve", "Holt", "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"),        
        user.createUser("5", "charles.morris@reqres.in", "Charles", "Morris", "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"),
        user.createUser("6", "tracey.ramos@reqres.in", "Tracey", "Ramos", "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg")
        ]

PAGES = []
class createUsersList:
    def __init__(self):
        global USERS
        global PAGES
       

    def getAll(self):
        # The string of all users is converted into JSON format 
        st = ""
        for i in USERS:
            st += "{'User_ID':'"+i.User_ID+"','Email':'"+i.Email+"','First_Name':'"+i.First_Name+"','Last_Name':'"+i.Last_Name+"','Avatar':'"+i.Avatar+"'},"
        
        return "["+st[:-1]+"]"   

    def addUser(self,user):
        st = ""
        USERS.append(user)
        print(len(USERS))
        return

    def getPage(self,pageNumber):
        #Split Users array in pages of 6 users
        n = 6
        PAGES = [USERS[i * n:(i + 1) * n] for i in range((len(USERS) + n - 1) // n )]  

        st = ""
        for i in PAGES[pageNumber]:
            st+="{'User_ID':'"+i.User_ID+"','Email':'"+i.Email+"','First_Name':'"+i.First_Name+"','Last_Name':'"+i.Last_Name+"','Avatar':'"+i.Avatar+"'},"
        
        return "[{ 'pages':'"+str(len(PAGES))+"' },"+st[:-1]+"]"   
        
    def getUser(self,page,user):
        #get a User from the users array
        i = USERS[(page*6)+user]
        return "{'User_ID':'"+i.User_ID+"','Email':'"+i.Email+"','First_Name':'"+i.First_Name+"','Last_Name':'"+i.Last_Name+"','Avatar':'"+i.Avatar+"'}"

    def updateUser(self,page,user,usrObj):
        #update a User from the users array
        USERS[(page*6)+user]=usrObj
        print("newusrt",usrObj.Avatar)
        print("id",USERS[(page*6)+user].User_ID)
        return
        
    def deleteUser(self,page,user):
        #delete a User from the users array
        USERS.pop((page*6)+user)
        return
