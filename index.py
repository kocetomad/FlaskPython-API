from flask import Flask,jsonify,request
import usersList,user
import json
app = Flask(__name__, static_url_path='')


# Create some pre-exesting users
LIST=usersList.createUsersList()
# Static serving of the front-end
@app.route('/')
def root():
    return app.send_static_file('index.html')

#-------------- ENDPOINTS ------------#

@app.route("/getListUsers/page/<int:page_id>",methods=['GET'])
def getListUsers(page_id):
    return LIST.getPage(page_id)

@app.route("/getSingleUser/page/<int:page_id>/user/<int:user>",methods=['GET'])
def getSingleUser(page_id,user):
    return LIST.getUser(page_id,user)

@app.route("/createUser",methods=['POST'])
def createUser():
    data = request.json
    newUser = user.createUser(data['User_ID'],data['Email'],data['First_Name'],data['Last_Name'],data['Avatar'])
    LIST.addUser(newUser)
    return jsonify({'msg':"User successfully created"})
    
@app.route("/updateUser",methods=['PUT'])
def updateUser():
    data = request.json
    tmpUser = user.createUser(data['User_ID'],data['Email'],data['First_Name'],data['Last_Name'],data['Avatar'])
    print("avatar",data['User_ID'])
    LIST.updateUser(int(data['page']),int(data['user']),tmpUser)
    return jsonify({'msg':"User successfully updated"})

@app.route("/deleteUser",methods=['DELETE'])
def deleteUser():
    data = request.json
    print(int(data['page']),int(data['user']))
    LIST.deleteUser(int(data['page']),int(data['user']))
    return jsonify({'msg':"User successfully deleted"})



if __name__ == '__main__':
    app.run(debug=True)
