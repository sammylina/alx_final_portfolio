#!/usr/bin/env python

import torch
import torch.nn as nn
import torch.nn.functional as F

class LeNet(nn.Module):
    def __init__(self):
        super(LeNet, self).__init__()

        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
        self.conv3 = nn.Conv2d(32, 64, 3, padding=1)

        self.pool = nn.MaxPool2d(2, 2)

        self.fc1 = nn.Linear(576, 256)
        self.fc2 = nn.Linear(256, 239)

        self.dropout = nn.Dropout(0.35)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x))) # we have (14 x 14 x 16)
        x = self.pool(F.relu(self.conv2(x))) # we have (7 x 7 x 32)
        x = self.pool(F.relu(self.conv3(x))) # we have (3 x 3 x 64)

        print('after last pool: ', x.shape)
        x = x.view(-1, 3 * 3 * 64)
        print('the first flat layer: ', x.shape)

        x = self.dropout(x)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)

        return self.fc2(x)

def load_model(checkpoint):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    model = LeNet()

    model.to(device)
    model.load_state_dict(torch.load(checkpoint, map_location=torch.device(device)))
    model.eval()

    return model

start = ord('ሀ')
end = ord('ፐ')

bad_chars = [4680, 4688, 4696, 4744, 4784, 4800, 4856, 4880, 4888]
m = [char_code for char_code in range(start, end + 1, 8) if char_code not in bad_chars]

def inference(logits):
    prob = F.softmax(logits, 1)
    top_p, top_class = prob.topk(7, dim=1)

    preds = torch.flatten(top_class)
    probs = torch.flatten(top_p)

    response = []
    for l, p in zip(preds, probs):
        unicode_point, character = label_to_char(l)
        response.append({'unicode_point': unicode_point, 'character': character, 'label': l.item(), 'certainity': round(p.item(), 3)})

    return response

def label_to_char(label):
    row, col = None, None
    label = label.item()
    if label % 7 == 0:
        col = 6
        row = int(label / 7) - 1
    else:
        col = (label % 7) - 1
        row = label // 7

    unicode_value = m[row] + col
    character = chr(unicode_value)
    
    return unicode_value, character 
    
